const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ServerError = require('../errors/serverError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictingRequest = require('../errors/conflictingRequest');

const { NODE_ENV, JWT_SECRET } = process.env;

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new ServerError('На сервере произошла ошибка.');
      }
      return res.send(user);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new ConflictingRequest('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email и пароль не могут быть пустыми.');
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw next(new UnauthorizedError('Не правильная почта или пароль'));
      }
      return res.cookie(
        'jwt',
        {
          token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
            expiresIn: '7d',
          }),
        },
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          samesire: true,
        },
      )
        .send({ user: { email, password } });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserInfo,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};

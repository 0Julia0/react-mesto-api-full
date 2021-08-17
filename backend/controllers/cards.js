const Card = require('../models/card');

const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const ServerError = require('../errors/serverError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new ServerError('На сервере произошла ошибка.');
      }
      return res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки.');
      }
      throw new ServerError('На сервере произошла ошибка.');
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('У вас не прав на удаление этой карточки.');
      }
      Card.findByIdAndRemove(req.params.cardId);
      return res.send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

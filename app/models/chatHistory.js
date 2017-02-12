var mongoose = require('mongoose');
var ChatHistorySchema = require('../schemas/chatHistory');
var ChatHistory = mongoose.model('ChatHistory',ChatHistorySchema);

module.exports = ChatHistory;
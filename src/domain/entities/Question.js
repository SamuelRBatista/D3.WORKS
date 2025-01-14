export class Question {
  constructor(id, title, question, options,correctAnswer, isSelect, isTextEditor) {
    this.id = id;
    this.title = title;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.options = options || [];
    this.isSelect = isSelect || false;
    this.isTextEditor = isTextEditor || false;
    }
  }
  
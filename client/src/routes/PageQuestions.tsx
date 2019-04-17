import React, { useState, useEffect } from 'react';
import PostQuestionsForm from '../containers/PostQuestionForm';
import QuestionsService from '../services/questions.service';
import QuestionButton from '../components/QuestionButton';

export default function PageQuestions() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  useEffect(() => {
    QuestionsService.getAll()
    .then(data => console.log(data))
  }, [])
  return (
    <div className="content-center">
      <PostQuestionsForm onSubmit={e => console.log(e)}/>
      <QuestionButton />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
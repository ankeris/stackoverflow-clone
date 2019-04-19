import React, { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Question } from '../../../sharedTypes/question.type';
import QuestionsService from '../services/questions.service';

interface Props extends RouteComponentProps<any> {
}

const PageQuestions: FunctionComponent<Props> = ({match, history}) => {
  useEffect(() => {
    QuestionsService.getOne(match.params.id).then(res => {
      console.log(res);
    })
  })
  return (
    <div className="content-center content-section">
    
    </div>
  );
};

export default PageQuestions
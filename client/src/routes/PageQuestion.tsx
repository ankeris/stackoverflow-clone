import React, { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

const PageQuestions: FunctionComponent<any>  = (props: RouteComponentProps<any>) => {
  return (
    <div className="content-center content-section">
    {props.match.params.id}
    </div>
  );
};

export default PageQuestions
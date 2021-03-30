import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useSound from 'use-sound';

import { initializeApollo } from '../../../lib/apollo';
import { WordsDocument } from '../../../lib/graphql/words.graphql';

const Savanna = ({ counter, setCounter, isMusicOn, group, page }) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  const handleAnswer = () => {
    if (isMusicOn) {
      correct();
    }
  };

  const fetchCurrentWords = async () => {
    const apollo = initializeApollo();
    setLoading(true);
    const { data } = await apollo.query({
      query: WordsDocument,
      variables: { group, page },
    });

    setState([...data.words]);
    setLoading(false);
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCurrentWords();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);
  // useHotkeys('1, 2, 3, 4', handleAnswer, [counter, correctAnswersArr]);

  return (
    <div className="savanna-outer">
      <div className="savanna-english">barbecue</div>
      <div className="savanna-translation">
        <div className="savanna-variants">1 слово</div>
        <div className="savanna-variants">2 перевод</div>
        <div className="savanna-variants">3 слон</div>
        <div className="savanna-variants">4 барбекю</div>
      </div>
    </div>
  );
};

export { Savanna };

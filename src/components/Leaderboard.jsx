import { useContext, useEffect, useState } from 'react';
import { LevelContext } from './LevelContext';
import { AuthContext } from './AuthContext';
import '../styles/leaderboard.css';

const Leaderboard = () => {
  const { levels } = useContext(LevelContext);
  const { apiUrl } = useContext(AuthContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/levels/scores`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const scores = await response.json();
        console.log(scores);
        if (response.ok) {
          const sortedScores = levels.map((level) => {
            return {
              level: level.name,
              scores: scores.filter((score) => score.level._id === level._id),
            };
          });
          setScores(sortedScores);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(scores);

  return (
    <div className="layout">
      <h1 className="leaderboard-header">Leaderboard</h1>
      <div className="leaderboard-layout">
        {scores.map((item, index) => {
          return (
            <div
              key={index}
              className={`leaderboard ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <h3>{item.level}</h3>
              <div className="leader-list">
                {item.scores.map((score, index) => {
                  while (index <= 9) {
                    return (
                      <>
                        <div className="leader-item">
                          <h4>{`${index + 1}.  ${score.user.username}`}</h4>
                          <h4>{`${score.time} seconds`}</h4>
                        </div>
                        {index < item.scores.length - 1 && <hr />}
                      </>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;

import { useContext, useEffect, useState } from 'react';
import { LevelContext } from './LevelContext';
import { AuthContext } from './AuthContext';

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
    <div>
      <h1>Leaderboard</h1>
      {scores.map((item) => {
        return (
          <>
            <h2>{item.level}</h2>
            <div>
              {item.scores.map((score, index) => {
                while (index <= 9) {
                  return (
                    <>
                      <h3>{`${index + 1}. ${score.user.username} finishing at ${score.time} seconds`}</h3>
                      {index < 9 && <hr />}
                    </>
                  );
                }
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Leaderboard;

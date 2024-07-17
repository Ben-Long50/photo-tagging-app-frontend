import GameImage from './GameImage';
import { useContext, useEffect, useRef, useState } from 'react';
import { LevelContext } from './LevelContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import Button from './Button';

const LevelPage = () => {
  const [targets, setTargets] = useState([]);
  const [successes, setSuccesses] = useState(0);
  const [timer, setTimer] = useState(0);
  const [scores, setScores] = useState([]);
  const { isAuthenticated, apiUrl } = useContext(AuthContext);
  const { levelId } = useParams();
  const { levels } = useContext(LevelContext);
  const selectedLevel = levels.filter((level) => {
    return level._id === levelId;
  });
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/levels/${levelId}/targets`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setTargets(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const key = setInterval(() => {
      setTimer((count) => {
        if (successes >= 5) {
          clearInterval(key);
          return count;
        }
        return parseFloat((count + 0.01).toFixed(2));
      });
    }, 10);

    if (successes >= 5) {
      endGame();
    }

    return () => {
      clearInterval(key);
    };
  }, [successes, targets.length]);

  const endGame = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        const scoreData = {
          userId: decodedUser.user._id,
          levelId: levelId,
          time: timer,
          date: new Date(),
        };
        const response = await fetch(`${apiUrl}/levels/${levelId}/scores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(scoreData),
        });
        const result = await response.json();
        if (response.ok) {
          console.log('Score submitted: ', result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    try {
      const topScores = await fetch(`${apiUrl}/levels/${levelId}/scores`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await topScores.json();
      console.log(result);
      if (topScores.ok) {
        setScores(result);
      }
    } catch (error) {
      console.error(error);
    }
    dialogRef.current.showModal();
  };

  const handleClose = () => {
    navigate('/levels');
  };

  const level = selectedLevel[0];
  return (
    <div>
      <div className="level-info">
        <h2 className="level-name">{level.name}</h2>
        <h4>{`Time: ${timer}`}</h4>
        <div className="target-container">
          {targets.map((target, index) => {
            return (
              <div key={index} className="target-card">
                {}
                <h5 className="target-name">{target.name}</h5>
                <img
                  src={target.image}
                  alt={target.name}
                  className="target-image"
                />
              </div>
            );
          })}
        </div>
      </div>
      <dialog className="leaderboard-dialog" ref={dialogRef}>
        <h1 className="dialog-title">Game Over!</h1>
        {isAuthenticated ? (
          <h4>{`You finished the game with a time of ${timer} seconds`}</h4>
        ) : (
          <h4>Log in to record your time and try for a high score</h4>
        )}

        <div className="leader-list">
          <h3>Top Scores:</h3>
          {scores.map((score, index) => {
            return (
              <>
                <div className="leader-item">
                  <h4>{`${index + 1}. ${score.user.username}`}</h4>
                  <h4>{`${score.time} seconds`}</h4>
                </div>
                {index < scores.length - 1 && <hr />}
              </>
            );
          })}
          <Button classes="close-button" onClick={handleClose}>
            Close
          </Button>
        </div>
      </dialog>
      <GameImage
        targets={targets}
        setTargets={setTargets}
        imageUrl={level.image}
        successes={successes}
        setSuccesses={setSuccesses}
      />
    </div>
  );
};

export default LevelPage;

import { useDispatch, useSelector } from 'react-redux';
import ModalBase from '~/components/Base/ModalBase';
import { IRootState } from '~/store/rootReducer';
import { handleHideTictactoeModal } from '~/store/game/tictactoe.slice';
import { useEffect } from 'react';
import { actionSaveTictactoeResult } from '~/store/player/player.action';

const ModalWinTictactoe = () => {
  const dispatch = useDispatch();
  const { showWinTictactoeModal, playerMark } = useSelector(
    (state: IRootState) => state.tictactoe
  );
  const { userData } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (userData.id && showWinTictactoeModal) {
      dispatch(
        actionSaveTictactoeResult({
          status: 'win',
          userId: userData.id,
          playerMark,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWinTictactoeModal]);

  return (
    <ModalBase
      visible={showWinTictactoeModal}
      onClose={() => dispatch(handleHideTictactoeModal())}
    >
      <div
        className={`relative bg-zinc-800 rounded-2xl z-2 transition-all w-[90vw] max-w-[500px] px-8 py-[30px] text-gray-300`}
      >
        <h2 className="text-3xl font-bold mb-2">🥳 You Win!</h2>
        <h3 className="text-lg mb-1">You are brilliant!</h3>

        <button
          className="close-modal absolute top-5 right-5 text-[1.75rem] hover:!opacity-70"
          onClick={() => dispatch(handleHideTictactoeModal())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </ModalBase>
  );
};

export default ModalWinTictactoe;

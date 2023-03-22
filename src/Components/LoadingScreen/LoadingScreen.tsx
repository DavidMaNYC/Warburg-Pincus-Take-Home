import { InputHTMLAttributes } from 'react';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

export function LoadingScreen() {
  const loadingState = useSelector((state: RootState) => state.loading);

  return (
    <div>
      {loadingState.isLoading && (
        <div className='fixed flex justify-center h-screen w-screen z-[9001]'>
          <div className='flex justify-center items-center'>
            <div className='opacity-75'>
              <div
                className={`fixed h-full w-full inset-0 z-[9001] bg-[#5C6F75] mix-blend-multiply`}
              />
            </div>
            <div className='z-120'>
              <ClipLoader size='100px' color='#FFFAEE' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadingScreen;

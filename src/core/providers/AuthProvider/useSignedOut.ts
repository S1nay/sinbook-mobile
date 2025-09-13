import useSignedIn from './useSignedIn';

const useSignedOut = () => {
  return !useSignedIn();
};

export default useSignedOut;

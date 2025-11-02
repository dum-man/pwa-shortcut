const useDeviceDetection = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
    userAgent
  );

  return isMobile;
};

export default useDeviceDetection;

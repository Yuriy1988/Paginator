import MobileDetect from 'mobile-detect';

export const detectDevice = (req) => {
  const detectedDevice = new MobileDetect(req.headers['user-agent']);

  return {
    isMobile: !!detectedDevice.mobile(),
    isTablet: !!detectedDevice.tablet(),
    isDesktop: !(!!detectedDevice.mobile() || !!detectedDevice.tablet()),
    os: detectedDevice.os(),
    device: detectedDevice,
  };
};

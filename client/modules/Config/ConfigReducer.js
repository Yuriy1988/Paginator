const initialState = {
  device: {},
};

const ConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

// Device types detaction
export const getDevice = (state) => {
  return state.config.device.device;
};
export const getIsMobile = (state) => {
  return state.config.device.isMobile;
};
export const getIsTablet = (state) => {
  return state.config.device.isTablet;
};
export const getIsDesktop = (state) => {
  return state.config.device.isDesktop;
};
export const getOS = (state) => {
  return state.config.device.os;
};
export const getPlatform = (state) => {
  let platform;
  if (state.config.device.isMobile) {
    platform = 'mobile';
  }
  if (state.config.device.isTablet) {
    platform = 'mobile';
  }
  if (state.config.device.isDesktop) {
    platform = 'desctop';
  }
  return platform;
};

export default ConfigReducer;

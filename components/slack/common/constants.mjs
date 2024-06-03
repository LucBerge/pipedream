const MAX_RESOURCES = 800;
const LIMIT = 200;

const CHANNEL_TYPE = {
  PUBLIC: "public_channel",
  PRIVATE: "private_channel",
  MPIM: "mpim",
  IM: "im",
};

const CHANNEL_TYPE_OPTIONS = [
  {
    label: "Public Channel",
    value: CHANNEL_TYPE.PUBLIC,
  },
  {
    label: "Private Channel",
    value: CHANNEL_TYPE.PRIVATE,
  },
  {
    label: "Group",
    value: CHANNEL_TYPE.MPIM,
  },
  {
    label: "User / Direct Message",
    value: CHANNEL_TYPE.IM,
  },
];

export default {
  MAX_RESOURCES,
  LIMIT,
  CHANNEL_TYPE,
  CHANNEL_TYPE_OPTIONS,
};

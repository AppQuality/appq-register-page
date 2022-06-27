import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostUsersMeCampaignsByCampaignIdMediaApiResponse } from "src/services/tryberApi";

// Define a type for the slice state
interface BugFormState {
  mediaList: FileElement[];
}

// Define the initial state using that type
const initialState: BugFormState = {
  mediaList: [],
};

const bugFormSlice = createSlice({
  name: "bugForm",
  initialState: initialState,
  reducers: {
    setMediaList(state, action: PayloadAction<FileElement[]>) {
      state.mediaList = action.payload;
    },
    appendMediaList(state, action: PayloadAction<FileElement[]>) {
      state.mediaList = state.mediaList.concat(action.payload);
    },
    deleteMedia(state, action: PayloadAction<FileElement>) {
      alert("delete media");
    },
    updateMediaList(
      state,
      action: PayloadAction<{
        requestId: string;
        data: PostUsersMeCampaignsByCampaignIdMediaApiResponse;
      }>
    ) {
      const {
        data: { files, failed },
        requestId,
      } = action.payload;
      const { mediaList } = state;
      mediaList.forEach((media, i) => {
        files?.forEach((file) => {
          if (media.fileName === file.name && requestId === media.uploadId) {
            mediaList[i].status = "success";
            mediaList[i].uploadedFileUrl = file.path;
          }
        });
        failed?.forEach((fail) => {
          if (media.fileName === fail.name && requestId === media.uploadId) {
            mediaList[i].status = "failed";
            mediaList[i].errorCode = media.errorCode;
          }
        });
      });
    },
  },
});

const { actions, reducer } = bugFormSlice;
export const { setMediaList, appendMediaList, updateMediaList, deleteMedia } =
  actions;
export default reducer;

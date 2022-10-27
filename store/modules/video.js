export default
    {

        namespaced: true,
        state() {
            return {
                VideoItem: {}
            }
        },
        mutations:
        {
            setVideoItem(state, value) {
                state.VideoItem = value
            },
        },

        actions: {

        },
    }
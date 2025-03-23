const axios = require("axios");

const getPublicRepoByUserName = async (userName) => {
    try {
        const data = await axios.get(
            `https://api.github.com/users/${userName}/repos`
        );

        if (data.status === 200) {
            return data.data;
        }

        return {
            errorCode: data.status,
            message: "Unknown error occurred",
        };
    } catch (error) {
        return {
            errorCode: error.response?.status || 500,
            message:
                error.response?.data?.message ||
                error.message ||
                "Server error",
        };
    }
};

module.exports = {
    getPublicRepoByUserName,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { User } from '../models/User';

export const checkUser = async (params) => {
    const user = await User.findOne({ where: params });
    return user?.get();
};
export const checkUserById = async ({ userId: user_id }) => {
    const user = await User.findOne({ where: { user_id } });
    return user?.get();
};

export const addUser = async (data) => {
    const newUser = await User.create({ ...data });
    return newUser.get();
};

export const updateUser = async (userId, userOpts) => {
    const updatedUser = await User.update({ where: { id: userId } }, { ...userOpts });
    return updatedUser;
};

export const removeUser = async (user_id) => {
    const isDeleted = await User.destroy({ where: { user_id } });
    return isDeleted;
};

export const addUserClick = async (user_id) => {
    const click = await User.increment('clicks', { where: { user_id } });
    return click;
};

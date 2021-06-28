// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Film } from '../models/Film';

export const checkFilm = async ({ id }) => {
    const film = await Film.findOne({ where: { film_id: id } });
    return film?.get();
};

export const addFilm = async ({ film_id, film_name }) => {
    const newFilm = await Film.create({ film_id, film_name });
    return newFilm.get();
};

export const updateFilm = async (filmId, filmOpts) => {
    const updatedFilm = await Film.update({ where: { id: filmId } }, { ...filmOpts });
    return updatedFilm;
};

export const removeFilm = async (film_id) => {
    const isRemoved = await Film.destroy({ where: { film_id } });
    return isRemoved;
};

export const addFilmClick = async ({ film_id }) => {
    await Film.increment('film_clicks', { where: { film_id } });
};

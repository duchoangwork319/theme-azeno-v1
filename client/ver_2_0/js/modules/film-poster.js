"use strict";

// Vanilla-JS port of the reference's play/pause script for `#play-film`/
// `#fusion-film` (html/revamp/homepage/5dla-homepage.html's inline
// <script>) for sections/5dla_film-poster.liquid.

const FILM_SELECTOR = ".five-film";
const PLAY_BUTTON_SELECTOR = "[data-c5dla-film-play]";
const VIDEO_SELECTOR = "[data-c5dla-film-video]";

/**
 * @param {HTMLElement} film
 */
const initOneFilm = film => {
  const video = film.querySelector(VIDEO_SELECTOR);
  const playButton = film.querySelector(PLAY_BUTTON_SELECTOR);
  if (!video || !playButton) return;

  playButton.addEventListener("click", async () => {
    try {
      await video.play();
    } catch {
      // Autoplay-with-sound can be rejected by the browser - still reveal
      // native controls below so the visitor can start it manually.
    }
    video.controls = true;
    film.classList.add("is-playing");
  });
};

/**
 * @param {ParentNode} [root]
 */
export const initFilmPoster = (root = document) => {
  root.querySelectorAll(FILM_SELECTOR).forEach(initOneFilm);
};

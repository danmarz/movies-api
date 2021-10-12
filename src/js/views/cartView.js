import { classNames } from "../includes/classSelector";

export const displayMovieItem = item => {
    const markup = `
                    <div class="target-inner__list" data-deleteId='${item.id}'>
                        <span class="target-inner__list--tickets">
                        <input type="number" value="${item.num}" class="target-inner__list-number">
                        $${item.num * 10}
                        </span>
                        <span class="target-inner__list--title">${item.title}</span>
                        <button class="target-inner__list-delete">
                            <svg class="icon target-inner__list-delete__icon">
                                <use xlink:href="img/svg/icons.svg#icon-minus"></use>
                            </svg>
                        </button>
                    </div>`;
    classNames.cartContainer.insertAdjacentHTML('beforeend', markup);
};

export const deleteMovieItem = id => {
    const deleteItem = document.querySelector(`[data-deleteId="${id}"]`);
    deleteItem.parentElement.removeChild(deleteItem);
};

export const displayCartNumber = cartMoviesNumber => {
    classNames.cartCircle.textContent = cartMoviesNumber;
};

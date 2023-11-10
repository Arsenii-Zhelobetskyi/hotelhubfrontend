/**
 * функція щоб робити запити на сервер
 * @param {*} url - url на який ми робимо запит
 * @param {*} uploadData - дані які ми відправляємо
 * @returns
 */
export const AJAX = async function (
  url,
  header = undefined,
  uploadData = undefined
) {
  try {
    // тут реалізована наступна логіка: якщо ми відправляємо дані, то ми робимо POST запит, якщо ми отримуємо дані, то GET запит
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          body: JSON.stringify(uploadData), //відправляємо свої дані
        })
      : fetch(url, {
          method: "GET",
        });
    const result = await fetchPro; // тут ми власне чекаємо на дані
    if (!result.ok) return; // якщо щось не так не будемо їх розпаковувати(запобігаємо виключенню)
    const data = await result.json(); // розпаковуємо дані
    // if (!result.ok) throw new Error(`${data.message} (${result.status}) 😿`); // знову ж таки, якщо щось трапилось кинемо помилку
    return data;
  } catch (err) {
    //тут обробляємо помилку
    console.log(err, "🔴 помилка....");
  }
};

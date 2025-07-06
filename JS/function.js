function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str; 
  }
  return str.slice(0, maxLength) + '…';
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // ماه 2 رقمی
  const day = String(date.getDate()).padStart(2, '0');        // روز 2 رقمی
  const hours = String(date.getHours()).padStart(2, '0');     // ساعت 2 رقمی
  const minutes = String(date.getMinutes()).padStart(2, '0'); // دقیقه 2 رقمی
  const seconds = String(date.getSeconds()).padStart(2, '0'); // ثانیه 2 رقمی
  
  return `${hours}:${minutes}`;
}
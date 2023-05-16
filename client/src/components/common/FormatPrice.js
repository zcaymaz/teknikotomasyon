export const formatPrice = (price) => {
    const options = {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    const formattedPrice = new Intl.NumberFormat(options).format(price);
    return formattedPrice + " ₺";
  };
  
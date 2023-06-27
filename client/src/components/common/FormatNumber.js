export const formatPhoneNumber = (phoneNumber) => {
    const digits = phoneNumber.replace(/\D/g, ""); // Sadece rakamları içeren bir dize oluşturun
  
    if (digits.length === 10) {
      // 10 haneli telefon numarası
      const areaCode = digits.slice(0, 3);
      const firstPart = digits.slice(3, 6);
      const secondPart = digits.slice(6, 8);
      const thirdPart = digits.slice(8, 10);
  
      return `${areaCode} ${firstPart} ${secondPart} ${thirdPart}`;
    } else if (digits.length === 11) {
      const areaCode = digits.slice(0, 4);
      const firstPart = digits.slice(4, 7);
      const secondPart = digits.slice(7, 9);
      const thirdPart = digits.slice(9, 11);
  
      return `${areaCode} ${firstPart} ${secondPart} ${thirdPart}`;
    }

    return phoneNumber;
  };
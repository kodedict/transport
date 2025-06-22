import CryptoJS from 'crypto-js';

const app_key : string | undefined = ''//process.env.REACT_APP_KEY;

const SmoothScroll = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
}

const encrypt = (data:string) => {
    return CryptoJS.AES.encrypt(data, app_key ?? '').toString();
}

const decrypt = (data:string) => {
    return CryptoJS.AES.decrypt(data, app_key ?? '').toString(CryptoJS.enc.Utf8);
}

const EmptyFormInput = (formSchema: any) => {
    return Object.keys(formSchema.fields).reduce((acc:any, item:any) => {
        acc[item] = '';
        return acc;
      }, {});
}

const formatNumber = (number:number|string) => {
  number = Number(number);
  if (number >= 1000000) {
      return Math.round(number / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (number >= 1000) {
      return Math.round(number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
      return number.toString();
  }
}

const numberWithCommas = (input: string | number, withDecimal = false, onlyDecimal = false) => {
  if (withDecimal){
      let hasDecimal = input.toString().split('').indexOf('.') !== -1;

      if (! hasDecimal )  input += '.00';
  }

  let parts = input.toString().split('.');

  if ( withDecimal && onlyDecimal ){
      return parts[1].toString();
  }

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (! withDecimal) return parts[0];

  return parts.join('.');
}

const convertToBase64 = async (file:any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
            } else {
              // Handle the case where reader.result is not a string
              reject(new Error('Invalid file type'));
            }
          }
        reader.onerror = (error) => reject(error);
      });
}

const getFileSizeInMB = (file:any) : number => {
  return parseInt((file.size / (1024 * 1024)).toFixed(2));
}

const generateRandomNumber = (length:number) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const removeCommas = (value:string) => {
  return strReplace(value, ',', '');
  return value.replace(/[^0-9]/g, '');
}

const abbreviateString = (string:string, maxLength = 10) => {
    if (string.length <= maxLength) return string;

    return string.slice(0, maxLength) + '...';

    const [firstString, lastString] = string.split(' ');

    const abbreviatedLastString = lastString.slice(0, maxLength - firstString.length - 4) + '...';

    return `${firstString} ${abbreviatedLastString}`;
}

function ucFirst(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const toggleNProgress = (on:boolean) => {
  const nprogress = document.getElementById('line_loader');
  on ? nprogress?.classList.remove('hidden') : nprogress?.classList.add('hidden');
}

function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else if (currentHour >= 17 && currentHour < 22) {
    return "Good evening";
  } else {
    return "Hello";
  }
}

const strReplace = (str:string, search:string, replace:any) => {
  return str
    .split(search)
    .map(word => word.charAt(0) + word.slice(1))
    .join(replace);
};

export {
    SmoothScroll,
    encrypt,
    decrypt,
    EmptyFormInput,
    convertToBase64,
    getFileSizeInMB,
    generateRandomNumber,
    formatNumber,
    numberWithCommas,
    removeCommas,
    abbreviateString,
    ucFirst,
    toggleNProgress,
    getGreeting,
    strReplace,
  }

import moment from "moment";

export const getAge = (dateString: any) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 0) return 0;
  return age;
}

export const getFormData = (object: any) => {
  const formData = new FormData();

  if (Array.isArray(object)) {
    object.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        formData.append(`array[${index}][${key}]`, item[key]);
      });
    });
  } else {
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
  }

  return formData;
};

export function alphaOnly(event: any) {
  const key = event.charCode;
  if (key >= 48 && key <= 58) event.preventDefault();
}

export function numOnly(event: any) {
  const key = event.charCode;
  if (key < 48 || key > 58) event.preventDefault();
}

export const checkEventAccpeted = (event: any, userId: any) => {
  if (!event.participants) event.participants = [];
  if (!event.teamA) event.teamA = [];
  if (!event.teamB) event.teamB = [];

  const members = [...event.participants, ...event.teamA, ...event.teamB];

  const member: any = members.find((m: any) => (m?.user?._id === userId));
  return member?.status == 'pending';
}

export function copyTxtToClip(text: any) {
  if (!navigator.clipboard) {
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('copied!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

export const checkFileSizeMoreThanTen = (file: any) => {
  return file?.size > 10000000;
}

export const employmentDuration = (joined: any) => {
  const a = moment();
  const b = moment(joined);
  const diffDuration = moment.duration(a.diff(b));
  let duration='';
  const Y= diffDuration.years();
  const M= diffDuration.months();
  const D= diffDuration.days();
  if(Y>0){
    duration += Y + ("Y");
  }
  if(M>0){
    duration += M + ("M");
  }
  if(D>0){
    duration += D + ("D");
  }
  return duration? duration: '0 D';
}

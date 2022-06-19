import s from './FormControls.module.css';

//HOC
// cons Textarea = CreateControlFormEl('textarea')
export const CreateControlFormEl = (Element) => {
  return (props) => {
    const {
      input,
      placeholder,
      type,
      meta: { touched, error },
    } = props;

    const hasError = error && touched;
    return (
      <div className={`${s.formControl} ${hasError ? s.error : ' '}`}>
        <div>
          <Element {...input} placeholder={placeholder} type={type} />
        </div>
        {hasError && <span>{error}</span>}
      </div>
    );
  };
};

//Provide inputTag to props to create formControl with appropriate field element
//<newFormControl inputTag={'input'} />
//<newFormControl inputTag={'textarea'} />
export const FormControlWithInputTag = (props) => {
  const {
    input,
    placeholder,
    type,
    meta: { touched, error, warning },
  } = props;

  console.log(error);
  const hasError = error && touched;
  const Tag = props.inputTag;
  return (
    <div className={`${s.formControl} ${hasError ? s.error : ' '}`}>
      <div>
        <Tag {...input} placeholder={placeholder} type={type} />
      </div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

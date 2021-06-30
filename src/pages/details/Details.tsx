import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import './details.scss';
import '../../style/input.scss';
import React, { useContext, useState } from 'react';
import { ImageCuter } from '../../components/image-cuter/ImageCuter';
import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';
import { Context } from '../../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IFormData {
  username: string;
  about: string;
}

const UPDATE_USER = loader('../../graphql/mutations/update-user.graphql');

export function Details() {
  const { store } = useContext(Context);
  const [updateUser] = useMutation(UPDATE_USER);

	const { t } = useTranslation();
	const [selectImgBtnPresses, setSelectImgBtnPressed] = useState(false);

	const [file, setFile] = useState<File | null | undefined>(null);

	const [blob, setBlob] = useState<Blob>();

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.item(0)) {
      setBlob(undefined);
      setFile(e.target.files?.item(0));
    }
	};

	const cut = (blob: Blob) => {
		setSelectImgBtnPressed(false);
		setBlob(blob);
	};

  const validate = (data: IFormData) => {
    const user = store.user;
    if (user?.name && user?.about && user?.avatarUrl) {
      if (!(data.username || data.about || blob)) {
        return { error: true };
      }
    } else if (!(data.username && data.about && blob)) {
      return { error: true };
    }
  }

  const submit = async (data: IFormData) => {
    if (blob) {
      try {
        const { username: name, about } = data;
        await updateUser({ variables: {
          name,
          about,
          avatar: new File([blob], file?.name as string) 
        }});
      } catch (e) {
        console.error(e);
      }
    }
  }


	return (
		<div className="details">
			<h1 className="details__h1">{t('details.title')}</h1>
			<hr />
			<Formik
				initialValues={{ username: '', about: '' }}
				onSubmit={ submit }
        validate={ validate }
			>
				<Form>
					<Field
						type="text"
						placeholder={t('common.username')}
						className="lt__input"
						name="username"
					/>
					<Field
            type="text" placeholder={t('details.about')}
            className="lt__input"
            name="about"
          />
					<div className="details__picture_container">
						<div>
							<button className="details__file_btn">
								<label className="details__file_label">
                  {t('details.picture')}
                </label>
								<input
									type="file"
									className="details__file"
									name="picture"
									onChange={changeFile}
									accept=".jpg, .jpeg, .png"
								/>
							</button>
							<span className="details__file_name">
                {file?.name || t('details.no_file')}
              </span>
						</div>
              {!!file && (
              !!blob ? 
              <FontAwesomeIcon
                icon={['fas', 'check']}
                className="details__file_success"
              /> :
              <button
                className="details__file_btn"
                onClick={() => setSelectImgBtnPressed(true)}
              >
                {t('common.select')}
              </button>)}
					</div>
					{!!file && <ImageCuter
            file={file}
            cutFn={cut}
            shouldCut={selectImgBtnPresses}
          />}
          <Field
            type="submit"
            value={t('common.submit') as string}
            className='lt__submit details__summit'
          />
				</Form>
			</Formik>
		</div>
	);
}

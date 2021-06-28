import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import './details.scss';
import '../../style/input.scss';
import { useState } from 'react';
import { ImageCuter } from '../../components/image-cuter/ImageCuter';

export function Details() {
	const { t } = useTranslation();

  const [file, setFile] = useState<File | null | undefined>(null);

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.item(0));
  };

	return (
		<div className="details">
			<h1 className="details__h1">{t('details.title')}</h1>
			<hr />
			<Formik
				initialValues={{ username: '', about: '' }}
				// validate={validate}
				onSubmit={() => console.log('Details submited')}
			>
				<Form>
					<Field
						type="text"
						placeholder={t('common.username')}
						className="lt__input"
						name="username"
					/>
					<Field
						type="text"
						placeholder={t('details.about')}
						className="lt__input"
						name="about"
					/>
					<div className='details__picture_container'>
						<button className="details__file_hider">
							<label className='details__file_label'>
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
            <span className='details__file_name'>
              {file?.name || t('details.no_file')}
            </span>
					</div>
          {!!file && <ImageCuter file={file}/>}
				</Form>
			</Formik>
		</div>
	);
}

import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import './details.scss';
import '../../style/input.scss';
import { useState } from 'react';
import { ImageCuter } from '../../components/image-cuter/ImageCuter';

export function Details() {
	const { t } = useTranslation();
	const [selectImgBtnPresses, setSelectImgBtnPressed] = useState(false);

	const [file, setFile] = useState<File | null | undefined>(null);

	const [imgSrc, setImgSrc] = useState('');

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.item(0)) {
      setFile(e.target.files?.item(0));
    }
	};

	const cut = (url: string) => {
		setSelectImgBtnPressed(false);
		setImgSrc(url);
	};

	return (
		<div className="details">
			<h1 className="details__h1">{t('details.title')}</h1>
			<hr />
			<Formik
				initialValues={{ username: '', about: '' }}
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
              {!!file &&
              <button
                className="details__file_btn"
                onClick={() => setSelectImgBtnPressed(true)}
              >
                {t('common.select')}
              </button>}
					</div>
					{!!file && <ImageCuter
            file={file}
            cutFn={cut}
            shouldCut={selectImgBtnPresses}
          />}
          <input type="submit" value={t('common.submit') as string}/>
				</Form>
			</Formik>
			<img src={imgSrc} alt="sory(" />
		</div>
	);
}

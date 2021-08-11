import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageCuter } from '../image-cuter/ImageCuter';
import classes from './image-chooser.module.scss';

type ImageChooserProps = {
	onImgChange: (file: File | null | undefined, blob: Blob | undefined) => unknown,
};

export default function ImageChooser(props: ImageChooserProps): JSX.Element {
	const { t } = useTranslation();
	const [selectImgBtnPressed, setSelectImgBtnPressed] = useState(false);
	const [blob, setBlob] = useState<Blob>();
	const [file, setFile] = useState<File | null | undefined>(null);

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.item(0)) {
			const curFile = e.target.files?.item(0);
			setBlob(undefined);
			setFile(curFile);
			props.onImgChange(curFile, undefined);
		}
	};

	const cut = (blob: Blob) => {
		setSelectImgBtnPressed(false);
		setBlob(blob);
		props.onImgChange(file, blob);
	};

	return (
		<div className={classes['image-chooser']}>
			<div className={classes['image-chooser__container']}>
				<button className={classes['image-chooser__file_btn']}>
					<label className={classes['image-chooser__file_label']}>{t('details.picture')}</label>
					<input
						type="file"
						className={classes['image-chooser__file']}
						name="picture"
						onChange={changeFile}
						accept=".jpeg, .png, .jpg"
					/>
				</button>
				<span className={classes['image-chooser__file_name']}>{file?.name || t('details.no_file')}</span>
				{!!file &&
					(blob ? (
						<FontAwesomeIcon icon={['fas', 'check']} className={classes['image-chooser__file_success']} />
					) : (
						<button
							className={classes['image-chooser__file_btn']}
							onClick={() => setSelectImgBtnPressed(true)}
						>
							{t('common.select')}
						</button>
					))}
			</div>
			{!!file && <ImageCuter file={file} cutFn={cut} shouldCut={selectImgBtnPressed} />}
		</div>
	);
}

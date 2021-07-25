import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageCuter } from '../image-cuter/ImageCuter';
import './image-chooser.scss';

type ImageChooserProps = {
  onImgChange: (file: File | null | undefined, blob: Blob | undefined) => unknown,
}

export default function ImageChooser(props: ImageChooserProps) {
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
		<div className="image-chooser">
			<div className="image-chooser__container">
				<button className="image-chooser__file_btn">
					<label className="image-chooser__file_label">{t('details.picture')}</label>
					<input
						type="file"
						className="image-chooser__file"
						name="picture"
						onChange={changeFile}
						accept=".jpeg"
					/>
				</button>
				<span className="image-chooser__file_name">{file?.name || t('details.no_file')}</span>
				{!!file &&
					(!!blob ? (
						<FontAwesomeIcon icon={['fas', 'check']} className="image-chooser__file_success" />
					) : (
						<button
							className="image-chooser__file_btn"
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

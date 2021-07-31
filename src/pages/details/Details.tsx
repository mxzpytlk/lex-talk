import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import './details.scss';
import '../../style/input.scss';
import React, { useContext, useState } from 'react';
import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';
import { Context } from '../../';
import { observer } from 'mobx-react-lite';
import Navbar from '../../components/navbar/Navbar';
import ImageChooser from '../../components/image-chooser/ImageChooser';

interface IFormData {
  username: string;
  about: string;
}

const UPDATE_USER = loader('../../graphql/mutations/update-user.graphql');

function Details() {
  const { store } = useContext(Context);
  const [updateUser] = useMutation(UPDATE_USER);

	const { t } = useTranslation();

	const [file, setFile] = useState<File | null | undefined>(null);

	const [blob, setBlob] = useState<Blob>();

  const onImgChange = (file: File | null | undefined, blob: Blob | undefined) => {
    setFile(file);
    setBlob(blob);
  }

  const validate = (data: IFormData) => {
    const user = store.userStore.user;
    if (user?.name && user?.about && user?.avatar) {
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
        const fileName = `${file?.name.split('.')[0]}.jpeg`;
        const { username: name, about } = data;
        const res = await updateUser({ variables: {
          name,
          about,
          avatar: new File([blob], fileName, {
            type: 'image/jpeg'
          })
        }});
        const user = res.data.updateUser;
        store.userStore.setUser(user);
      } catch (e) {
        console.error(e);
      }
    }
  }


	return (
		<div className="details">
      <Navbar />
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
          <ImageChooser onImgChange={onImgChange}/>
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

export default observer(Details);

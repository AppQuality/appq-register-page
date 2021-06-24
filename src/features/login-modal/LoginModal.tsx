import { Modal } from "@appquality/appquality-design-system/dist/stories/modal/Modal";
import { StyledLoginModal } from "./_style";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Field,
  Form,
  Formik,
  Text,
} from "@appquality/appquality-design-system";
import { Button } from "@appquality/appquality-design-system";
import * as yup from "yup";
import WPAPI from "../../utils/wpapi";
import { LoginMopdalProps } from "./_types";
import { useState } from "react";

export const LoginModal = ({ isOpen, onClose }: LoginMopdalProps) => {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = {
    email: yup
      .string()
      .email(t("Email must be a valid email"))
      .required(t("This is a required field")),
    password: yup.string().required(t("This is a required field")),
  };
  const handleloginLn = () => {
    window.location.href =
      "https://crowd.app-quality.com/wp-admin/admin-ajax.php?loc=&action=linkedin_oauth_redirect";
  };
  const handleloginFb = () => {
    window.location.href =
      "https://crowd.app-quality.com/wp-admin/admin-ajax.php?loc=&action=facebook_oauth_redirect";
  };
  const gettingStartedUrl =
    i18n.language === "en"
      ? "/getting-started"
      : `/${i18n.language}/getting-started`;
  return (
    <StyledLoginModal>
      <Modal title={t("Login")} isOpen={isOpen} onClose={onClose}>
        <Formik
          onSubmit={async (values, actions) => {
            setError(false);
            try {
              const nonce = await WPAPI.getNonce();
              WPAPI.login({
                username: values.email,
                password: values.password,
                security: nonce,
              });
            } catch (e) {
              setError(e.message);
            }
            actions.setSubmitting(false);
          }}
          validationSchema={yup.object(validationSchema)}
          initialValues={initialValues}
        >
          {(props) => (
            <Form className="modal-login-form">
              <Text className="aq-text-center aq-mb-3">
                <div className="capitalize-first">
                  <strong>{t("login with your credentials")}</strong>
                </div>
                <div>
                  <Trans i18nKey="or <1>create an account</1>">
                    or
                    <Link onClick={onClose} to={gettingStartedUrl}>
                      create an account
                    </Link>
                  </Trans>
                </div>
              </Text>
              <Field type="email" name="email" label={t("Email")} />
              <Field type="password" name="password" label={t("Password")} />
              <Text className="aq-text-center aq-mb-3 capitalize-first">
                <a href="/wp-login.php?action=lostpassword">
                  {t("forgot your password?")}
                </a>
              </Text>
              <Button
                className="aq-mb-3 capitalize-first"
                type="success"
                size="block"
                htmlType="submit"
                disabled={props.isSubmitting || !props.dirty || !props.isValid}
              >
                {props.isSubmitting ? "wait..." : t("login")}
              </Button>
              {error && <div className="aq-text-danger">{error}</div>}
              <Text className="capitalize-first aq-text-center aq-mb-3">
                {t("or login with")}
              </Text>
              <div className="login-social aq-text-center">
                <Button type="light" onClick={handleloginLn}>
                  <img
                    alt="login with linkedin"
                    src="static/linkedin-logo.svg"
                  />
                </Button>
                <Button type="light" onClick={handleloginFb}>
                  <img
                    alt="login with facebook"
                    src="static/facebook-logo.svg"
                  />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </StyledLoginModal>
  );
};
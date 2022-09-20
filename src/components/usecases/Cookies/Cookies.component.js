import React, { useState } from "react";
import { Field } from "formik";
import _ from "lodash";

export const DomainEditForm = ({ domainName, cookies, toggleEdit }) => {
  const editDomainName = (form, fieldName, value) => {
    const cookiesClone = _.cloneDeep(cookies);
    cookiesClone[value] = cookiesClone[domainName];
    delete cookiesClone[domainName];
    form.setFieldValue(fieldName, cookiesClone);
  };

  const addCookie = (form, fieldName) => {
    const cookiesClone = _.cloneDeep(cookies);
    cookiesClone[domainName].push({
      name: "edit",
      value: "thisCookie",
      path: "/",
    });
    form.setFieldValue(fieldName, cookiesClone);
  };

  return (
    <Field name="cookies">
      {({ field, form }) => (
        <div className="py-6 px-6 lg:px-8 border rounded-md my-4">
          <h3 className="mb-4 text-xl font-medium text-gray-900 ">
            Edit domain
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                domain
              </label>
              <input
                value={domainName}
                onChange={(e) =>
                  editDomainName(form, field.name, e.target.value)
                }
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="provide a username..."
              />
            </div>
            {cookies[domainName].map((cookie, index) => (
              <Cookie
                domainName={domainName}
                cookie={cookie}
                cookieIndex={index}
                editable
              />
            ))}
            <span
              onClick={() => addCookie(form, field.name)}
              className="block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600 mt-2 w-fit"
            >
              add cookie
            </span>
            <div className="flex">
              <button
                className="w-full border hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
                onClick={toggleEdit}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </Field>
  );
};

export const CookieForm = ({ cookie, cookieIndex, domainName, toggleEdit }) => {
  const editCookieField = (e, form, fieldName, fieldValue) => {
    const clone = _.cloneDeep(fieldValue);
    if (e.target.type === "checkbox") {
      clone[domainName][cookieIndex][e.target.name] = e.target.checked;
    } else {
      clone[domainName][cookieIndex][e.target.name] = e.target.value;
    }
    form.setFieldValue(fieldName, clone);
  };

  return (
    <Field name={`cookies`}>
      {({ field, form }) => (
        <div className="py-6 px-6 lg:px-8 border rounded-md my-4">
          <h3 className="mb-4 text-xl font-medium text-gray-900 ">
            Edit cookie
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  editCookieField(e, form, field.name, field.value)
                }
                value={field.value[domainName][cookieIndex]["name"]}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="provide a username..."
              />
            </div>
            <div>
              <label
                htmlFor="value"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Value
              </label>
              <input
                onChange={(e) =>
                  editCookieField(e, form, field.name, field.value)
                }
                value={field.value[domainName][cookieIndex]["value"]}
                type="text"
                name="value"
                id="value"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="provide a username..."
              />
            </div>
            <div>
              <label
                htmlFor="path"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Path
              </label>
              <input
                onChange={(e) =>
                  editCookieField(e, form, field.name, field.value)
                }
                value={field.value[domainName][cookieIndex]["path"]}
                type="text"
                name="path"
                id="path"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="provide a username..."
              />
            </div>
            <div>
              <label
                htmlFor="expires"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Expires
              </label>
              <input
                onChange={(e) =>
                  editCookieField(e, form, field.name, field.value)
                }
                value={field.value[domainName][cookieIndex]["expires"]}
                type="datetime-local"
                name="expires"
                id="expires"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="provide a username..."
              />
            </div>
            <div className="flex">
              <input
                onChange={(e) =>
                  editCookieField(e, form, field.name, field.value)
                }
                value={field.value[domainName][cookieIndex]["secure"]}
                checked={field.value[domainName][cookieIndex]["secure"]}
                type="checkbox"
                name="secure"
                className="mr-4 mb-1.5"
              />
              <label
                htmlFor="secure"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Secure
              </label>
            </div>
            <div className="flex">
              <input
                onChange={(e) =>
                  editCookieField(e, form, field.name, field.value)
                }
                value={field.value[domainName][cookieIndex]["httpOnly"]}
                checked={field.value[domainName][cookieIndex]["httpOnly"]}
                type="checkbox"
                name="httpOnly"
                className="mr-4 mb-1.5"
              />
              <label
                htmlFor="httpOnly"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                HttpOnly
              </label>
            </div>
            <div className="flex">
              <button
                type="button"
                className="w-full border hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={toggleEdit}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </Field>
  );
};

export const Cookie = ({
  cookie,
  domainName,
  cookieIndex,
  editable = false,
}) => {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  const { name, value, expires, httpOnly, path, secure } = cookie;
  const cookieString = [];
  cookieString.push(`${name}=${value}`);
  if (path) cookieString.push("Path=" + path);
  if (expires) cookieString.push("Expires=" + expires);
  if (secure) cookieString.push("Secure");
  if (httpOnly) cookieString.push("HttpOnly");

  const deleteCookie = (form, fieldName, fieldValue) => {
    const clone = _.cloneDeep(fieldValue);
    clone[domainName].splice(cookieIndex, 1);
    form.setFieldValue(fieldName, clone);
  };

  return !edit ? (
    <Field name="cookies">
      {({ field, form }) => (
        <div className="flex">
          <li className="list-disc ml-5 mr-4">{cookieString.join("; ")}</li>
          {editable ? (
            <>
              <span
                className="block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600"
                onClick={toggleEdit}
              >
                edit
              </span>
              <span
                className="block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600"
                onClick={() => deleteCookie(form, field.name, field.value)}
              >
                delete
              </span>
            </>
          ) : null}
        </div>
      )}
    </Field>
  ) : (
    <CookieForm
      cookie={cookie}
      cookieIndex={cookieIndex}
      domainName={domainName}
      toggleEdit={toggleEdit}
    />
  );
};

export const Domain = ({ domainName, cookies, className = "" }) => {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => setEdit(!edit);

  const deleteDomain = (domainName, fieldName, form, fieldValue) => {
    form.setFieldValue(fieldName, _.omit(fieldValue, [domainName]));
  };

  return !edit ? (
    <Field name="cookies">
      {({ field, form }) => (
        <div className={className}>
          <div className="flex mb-2">
            <div className="font-semibold mr-5">{domainName}</div>
            <span
              className="block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600"
              onClick={toggleEdit}
            >
              edit
            </span>
            <span
              className="block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600"
              onClick={() =>
                deleteDomain(domainName, field.name, form, field.value)
              }
            >
              delete
            </span>
          </div>
          <ul className="mb-2">
            {cookies[domainName].map((cookie, index) => (
              <Cookie cookie={cookie} cookieIndex={index} />
            ))}
          </ul>
        </div>
      )}
    </Field>
  ) : (
    <DomainEditForm
      domainName={domainName}
      cookies={cookies}
      toggleEdit={toggleEdit}
    />
  );
};

export const AddDomainForm = ({ toggleForm }) => {
    const [name, setName] = useState(null);

    const addDomain = (field, form) => {
        if (name && !field.value.hasOwnProperty(name)) {
            form.setFieldValue(field.name, {...field.value, [name]: []})
        }
        toggleForm();
    }

  return (
    <Field name="cookies">
      {({ field, form }) => (
        <div className="py-6 px-6 lg:px-8 border rounded-md my-4">
          <h3 className="mb-4 text-xl font-medium text-gray-900 ">
            Add domain
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                domain name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="provide a domain name..."
              />
            </div>
            <div className="flex">
              <button
                type="button"
                className="w-full border hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
                onClick={toggleForm}
              >
                Close
              </button>
              <button
                onClick={() => addDomain(field, form)}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </Field>
  );
};

export const Cookies = ({ cookies, className = "" }) => {
  const [isAddDomainFormOpen, setIsAddDomainFormOpen] = useState(false);
  const toggleForm = () => setIsAddDomainFormOpen(!isAddDomainFormOpen);

  return (
    <div>
      <span
        onClick={toggleForm}
        className="border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600 ml-3"
      >
        add domain
      </span>
      {isAddDomainFormOpen ? (
        <AddDomainForm toggleForm={toggleForm} />
      ) : null}
      {Object.keys(cookies)
        .sort((a, b) => (a <= b ? -1 : 1))
        .map((domain) => (
          <Domain cookies={cookies} domainName={domain} />
        ))}
    </div>
  );
};

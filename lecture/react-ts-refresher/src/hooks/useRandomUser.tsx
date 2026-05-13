import * as React from "react";

interface FreeAPIRandomUserResponse {
  statusCode: number;
  data: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      pincode: number | string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sh1: string;
      sha256: string;
    };
    dob: {
      date: string;
      age: number;
    };
    registered: {
      date: string;
      age: number;
    };
    phone: string;
    cell: string;
    id: number;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  };
  message: string;
  success: boolean;
}

function useRandomUser() {
  const [user, setUser] = React.useState<
    null | FreeAPIRandomUserResponse["data"]
  >();

  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | string>(null);

  async function fetchRandomUser() {
    setIsFetching(true);
    try {
      const rawResponse = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers/user/random",
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      const response = (await rawResponse.json()) as FreeAPIRandomUserResponse;
      if (response.data && response.success) {
        setUser(response.data);
      }
    } catch (err) {
      console.error("Error in fetching user: ", err);
      setError(err);
    } finally {
      setIsFetching(false);
      setError(null);
    }
  }

  return { user, fetchRandomUser, isFetching, error };
}

export default useRandomUser;

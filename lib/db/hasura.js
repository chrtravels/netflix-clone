export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      videoId
      favorited
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    { videoId, userId },
    token
    );

    return response;
  }


export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
  `;

  const { email, issuer, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
    );
    console.log({ response, issuer });
    return response?.data?.stats?.length > 0;
}

// export async function createUserStats(userId, videoId) {

// }

export async function updateStats(token, { userId, videoId, favorited, watched }) {
  const operationsDoc = `
  mutation updateStats($userId: String!, $videoId: String!, $favorited: Int!, $watched: Boolean!) {
    update_stats(
      _set: { favorited: $favorited, watched: $watched},
      where: {
        userId: {_eq: $userId},
        videoId: {_eq: $videoId}
      }) {
      returning {
        favorited
        userId
        videoId
        watched
      }
      }
  }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { favorited, userId, videoId, watched },
    token
    );
    console.log({ response });
    return response;

}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;

  const response = await queryHasuraGQL(operationsDoc, "isNewUser", { issuer }, token);
  return response?.data?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

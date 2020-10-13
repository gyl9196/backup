const awsmobile = {
  "aws_project_region": "ap-southeast-2",
  // "aws_cognito_identity_pool_id": "ap-southeast-2:07c8bf6e-b1b6-4bfd-ba86-0318ba06d8a9",
  "aws_cognito_region": "ap-southeast-2",
  "aws_user_pools_id": "ap-southeast-2_ARVzT6nBx",
  "aws_user_pools_web_client_id": "4lmh65ffiev8conp2vpgrp2p4q",
  "oauth": {
      "domain": "neil-test.auth.ap-southeast-2.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "http://localhost:3000/signin/",
      "redirectSignOut": "http://localhost:3000/signin/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS"
};


export default awsmobile;
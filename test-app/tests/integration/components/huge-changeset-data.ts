export default {
  name: 'amaury',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: {
      abbreviation: 'CA',
      full: 'California',
      timezone: {
        name: 'America/Los_Angeles',
        offset: '-07:00',
        dst: {
          start: '2022-03-13T10:00:00.000Z',
          end: '2022-11-06T09:00:00.000Z',
        },
      },
    },
    zip: {
      code: '12345',
      extension: '6789',
      plus4: {
        digits: '0123',
      },
    },
    location: {
      lat: {
        degrees: 37,
        minutes: 46,
        seconds: 29,
        direction: 'N',
      },
      lng: {
        degrees: 122,
        minutes: 25,
        seconds: 8,
        direction: 'W',
      },
      timezone: {
        name: 'America/Los_Angeles',
        offset: '-07:00',
        dst: {
          start: '2022-03-13T10:00:00.000Z',
          end: '2022-11-06T09:00:00.000Z',
        },
      },
    },
    coordinates: {
      lat: {
        degrees: 37,
        minutes: 46,
        seconds: 29,
        direction: 'N',
      },
      lng: {
        degrees: 122,
        minutes: 25,
        seconds: 8,
        direction: 'W',
      },
      altitude: {
        value: 10,
        unit: {
          short: 'm',
          long: 'meters',
          conversionFactor: 3.28084,
        },
      },
      accuracy: {
        value: 5,
        unit: {
          short: 'm',
          long: 'meters',
          conversionFactor: 3.28084,
        },
      },
    },
  },
  contacts: [
    {
      firstName: 'amaury',
      lastName: 'cardon',
      email: 'amaury@example.com',
      phone: {
        home: {
          number: {
            areaCode: '555',
            prefix: '123',
            lineNumber: '4567',
          },
          extension: '123',
        },
        work: {
          number: {
            areaCode: '555',
            prefix: '567',
            lineNumber: '8901',
          },
          extension: '456',
        },
      },
      social: {
        facebook: {
          url: 'https://www.facebook.com/amaury.cardon',
          username: 'amaury.cardon',
        },
        twitter: {
          url: 'https://twitter.com/amaury_c',
          username: 'amaury_c',
          followerCount: 10000,
        },
        linkedin: {
          url: 'https://www.linkedin.com/in/amaury-cardon',
          username: 'amaury-cardon',
        },
      },
    },
    {
      firstName: 'jane',
      lastName: 'doe',
      email: 'jane@example.com',
      social: {
        facebook: {
          url: 'https://www.facebook.com/jane.doe',
          username: 'jane.doe',
        },
        twitter: {
          url: 'https://twitter.com/jane_doe',
          username: 'jane_doe',
          followerCount: 5000,
        },
        linkedin: {
          url: 'https://www.linkedin.com/in/jane-doe',
          username: 'jane-doe',
        },
      },
      phone: {
        home: {
          number: {
            areaCode: '555',
            prefix: '876',
            lineNumber: '5432',
          },
          extension: '012',
        },
      },
    },
  ],
};

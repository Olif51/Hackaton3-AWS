CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
    rental_history TEXT,
    prime_status BOOLEAN NOT NULL DEFAULT FALSE,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user (firstname, lastname, email, hashedPassword, prime_status, role) 
VALUES ('John', 'Doe', 'basicuser@mail.com', '$argon2id$v=19$m=65536,t=5,p=1$3fVq3IWd1+YIoIgt92Z3kw$Lt6M1wv2M4x8GI2C3ggI8PrtgieelyY+9dKxdsrUghM', FALSE, 'user')
, ('Jane', 'Doe', 'primeuser@mail.com','$argon2id$v=19$m=65536,t=5,p=1$3fVq3IWd1+YIoIgt92Z3kw$Lt6M1wv2M4x8GI2C3ggI8PrtgieelyY+9dKxdsrUghM', TRUE, 'user')
, ('Jack', 'User', 'admin@mail.com', '$argon2id$v=19$m=65536,t=5,p=1$3fVq3IWd1+YIoIgt92Z3kw$Lt6M1wv2M4x8GI2C3ggI8PrtgieelyY+9dKxdsrUghM', TRUE, 'admin');

CREATE TABLE vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_maker VARCHAR(255) NOT NULL,
    car_model VARCHAR(255) NOT NULL,
    registration_number VARCHAR(255) NOT NULL,
    mileage INT NOT NULL,
    location_status ENUM('available', 'rented', 'maintenance') NOT NULL,
    latitude VARCHAR(255) NOT NULL,
    longitude VARCHAR(255) NOT NULL,
    isInAmazonLocker BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO vehicle (car_maker, car_model, registration_number, mileage, location_status, latitude, longitude, isInAmazonLocker)
VALUES ('Renault', 'Clio V', '1-ABC-123', 10000, 'available', '49.22750555555556', '4.012963888888889', FALSE)
, ('Renault', 'Megane IV', '2-ABC-123', 10000, 'available', '49.22558611111111', '4.0234499999999995', FALSE)
, ('Renault', 'Captur', '3-ABC-123', 10000, 'available', '49.233925', '4.019336111111111', FALSE)
, ('Renault', 'Talisman', '4-ABC-123', 10000, 'available', '49.235225', '4.024208333333333', FALSE)
, ('Peugeot', '208', '5-ABC-123', 10000, 'available', '49.24495', '4.016252777777778', FALSE)
, ('Peugeot', '308', '6-ABC-123', 10000, 'available', '49.24481388888889', '4.036694444444445', FALSE)
, ('Peugeot', '508', '7-ABC-123', 10000, 'available', '49.24976388888889', '4.043719444444444', FALSE)
, ('Audi', 'A3', '8-ABC-123', 10000, 'available', '49.26133611111111', '4.038091666666666', FALSE)
, ('Audi', 'A4', '9-ABC-123', 10000, 'available', '49.26294722222222', '4.053013888888889', FALSE)
, ('Audi', 'A5', '10-ABC-123', 10000, 'available', '49.26479722222222', '4.022608333333333', FALSE)
, ('Mercedes', 'Classe A', '11-ABC-123', 10000, 'available', '49.26058611111111', '4.014986111111111', FALSE)
, ('Mercedes', 'Classe B', '12-ABC-123', 10000, 'available', '49.267577777777774', '4.017613888888889', FALSE)
, ('Mercedes', 'C63 AMg', '13-ABC-123', 10000, 'available', '49.255177777777774', '4.0304166666666665', FALSE)
, ('BMW', 'Serie 3', '14-ABC-123', 10000, 'available', '49.24554722222222', '4.003886111111111', FALSE)
, ('BMW', 'Serie 5', '15-ABC-123', 10000, 'available', '49.23876388888889', '4.045563888888889', TRUE)
, ('BMW', 'Serie 7', '16-ABC-123', 10000, 'available', '49.256769444444444', '4.0382694444444445', TRUE)
, ('Toyota', 'Corrolla', '17-ABC-123', 10000, 'available', '49.26453333333333', '4.059541666666666', TRUE)
, ('Range Rover', 'Evoc', '18-ABC-123', 10000, 'available', '49.254777777777775', '4.017113888888889', TRUE);

CREATE TABLE rental (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    total_price INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO rental (user_id, vehicle_id, start_date, end_date, total_price)
VALUES (1, 1, '2020-01-01 00:00:00', '2020-01-02 00:00:00', 100)
, (1, 2, '2020-01-02 00:00:00', '2020-01-03 00:00:00', 100)
, (1, 3, '2020-01-03 00:00:00', '2020-01-04 00:00:00', 100)
, (1, 4, '2020-01-04 00:00:00', '2020-01-05 00:00:00', 100)

CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    rental_history TEXT,
    prime_status TINYINT(1) NOT NULL DEFAULT 0,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    make VARCHAR(255) NOT NULL,
    registration_number VARCHAR(255) NOT NULL,
    purchase_date DATE NOT NULL,
    mileage INT NOT NULL,
    location_status ENUM('available', 'rented', 'maintenance') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    geographical_boundaries VARCHAR(255) NOT NULL,
    parking_spaces INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    vehicle_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE amazon_delivery (
    delivery_user_id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_name VARCHAR(255) NOT NULL,
    delivery_email VARCHAR(255) NOT NULL,
    delivery_phone VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE check_in_out (
    check_id INT AUTO_INCREMENT PRIMARY KEY,
    mileage_at_pickup INT NOT NULL,
    damages_reported TEXT NOT NULL,
    pickup_location_id INT NOT NULL,
    return_location_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    Amazon_delivery_user_id INT,
    FOREIGN KEY (pickup_location_id) REFERENCES location(id),
    FOREIGN KEY (return_location_id) REFERENCES location(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id),
    FOREIGN KEY (Amazon_delivery_user_id) REFERENCES amazon_delivery(delivery_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


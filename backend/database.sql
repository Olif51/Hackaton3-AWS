CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

CREATE TABLE vehicle (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    make VARCHAR(255) NOT NULL,
    registration_number VARCHAR(255) NOT NULL,
    purchase_date DATE NOT NULL,
    mileage INT NOT NULL,
    location_status ENUM('available', 'rented', 'maintenance') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    geographical_boundaries VARCHAR(255) NOT NULL,
    parking_spaces INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    account_info VARCHAR(255) NOT NULL,
    payment_info VARCHAR(255) NOT NULL,
    rental_history TEXT,
    Amazon_Prime_status ENUM('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    vehicle_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE check_in_out (
    check_id INT AUTO_INCREMENT PRIMARY KEY,
    mileage_at_pickup INT NOT NULL,
    damages_reported TEXT NOT NULL,
    pickup_location_id INT NOT NULL,
    return_location_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    Amazon_delivery_user_id INT,
    FOREIGN KEY (pickup_location_id) REFERENCES locations(location_id),
    FOREIGN KEY (return_location_id) REFERENCES locations(location_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (Amazon_delivery_user_id) REFERENCES amazon_delivery(delivery_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE amazon_delivery (
    delivery_user_id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_name VARCHAR(255) NOT NULL,
    delivery_email VARCHAR(255) NOT NULL,
    delivery_phone VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


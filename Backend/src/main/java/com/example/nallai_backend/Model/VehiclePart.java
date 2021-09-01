package com.example.nallai_backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "parts")
public class VehiclePart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "pname")
    private String name;

    @Column(name = "description")
    private String desc;

    @Column(name = "price")
    private double price;

    @Column(name = "shelf_no")
    private int shelfNo;

    @Column(name = "availability")
    private boolean availability;

    public VehiclePart(){

    }

    public VehiclePart(int id, String name, String desc, double price, int shelfNo, boolean availability) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.shelfNo = shelfNo;
        this.availability = availability;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getShelfNo() {
        return shelfNo;
    }

    public void setShelfNo(int shelfNo) {
        this.shelfNo = shelfNo;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }
}

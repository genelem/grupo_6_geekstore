const express = require("express");
const path = require ("path");

const productController = {
    index: (req,res) => {
        res.render("productos")
    },
    crear: (req,res) => {
        res.render("crearProducto")
    },
    ofertas: (req,res) => {
        res.render("ofertas")
    },
    detalle: (req, res) => {
        res.render("productDetail")
    },
    carrito: (req, res) => {
        res.render("productCart");
    },
    carrito2:(req, res) => {
        res.render("productCart2");
    },
    finalizar: (req, res) => {
        res.render("confirmacionCompra");
    },
    editar: (req,res) => {
        res.render("editarProducto")
    },
    editar2: (req,res) => {
        res.render("editarProducto2")
    }
};

module.exports = productController
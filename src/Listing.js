import React, { Component } from 'react';

export const Listing = ({address, description}) => (
    <div>
        <text>{address}</text>
        <text>{description}</text>
    </div>
);
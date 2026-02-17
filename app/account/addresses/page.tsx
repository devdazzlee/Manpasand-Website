'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

const addresses = [
  {
    id: '1',
    name: 'Ahmed Khan',
    address: '123 Main Street',
    city: 'Karachi',
    postalCode: '75500',
    phone: '+92 342 3344040',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Ahmed Khan',
    address: '456 Second Avenue',
    city: 'Lahore',
    postalCode: '54000',
    phone: '+92 342 3344040',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);
  const [addressesList, setAddressesList] = useState(addresses);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Address Book</h1>
            <p className="text-xl text-white/90">Manage your shipping addresses</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-end mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Address</span>
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addressesList.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border-2 rounded-2xl p-6 ${
                  address.isDefault
                    ? 'border-[#1A73A8] bg-[#F8F2DE]'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[#1A73A8]" />
                    <h3 className="font-semibold text-[#0D2B3A]">{address.name}</h3>
                    {address.isDefault && (
                      <span className="bg-[#1A73A8] text-white text-xs px-3 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#1A73A8] hover:text-[#0D2B3A]">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-[#6B7280]">
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.postalCode}
                  </p>
                  <p>{address.phone}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonTemplate from '../templates/fundamental/Button.template';
import CardTemplate from '../templates/fundamental/Card.template';
import InputTemplate from '../templates/fundamental/Input.template';

describe('Fundamental Component Templates', () => {
  describe('ButtonTemplate', () => {
    it('renders all button variants', () => {
      render(<ButtonTemplate />);
      
      expect(screen.getByText('Button Component')).toBeInTheDocument();
      expect(screen.getByText('Small Button')).toBeInTheDocument();
      expect(screen.getByText('Medium Button')).toBeInTheDocument();
      expect(screen.getByText('Large Button')).toBeInTheDocument();
      expect(screen.getByText('Disabled Button')).toBeInTheDocument();
    });

    it('handles button clicks', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      render(<ButtonTemplate />);
      
      fireEvent.click(screen.getByText('Small Button'));
      expect(consoleSpy).toHaveBeenCalledWith('Small button clicked');
      
      fireEvent.click(screen.getByText('Medium Button'));
      expect(consoleSpy).toHaveBeenCalledWith('Medium button clicked');
      
      consoleSpy.mockRestore();
    });

    it('disables button when disabled prop is true', () => {
      render(<ButtonTemplate />);
      const disabledButton = screen.getByText('Disabled Button');
      expect(disabledButton).toBeDisabled();
    });
  });

  describe('CardTemplate', () => {
    it('renders all card variants', () => {
      render(<CardTemplate />);
      
      expect(screen.getByText('Card Component')).toBeInTheDocument();
      expect(screen.getByText('Basic Card')).toBeInTheDocument();
      expect(screen.getByText('Compact Card')).toBeInTheDocument();
      expect(screen.getByText('Interactive Card')).toBeInTheDocument();
    });

    it('displays card content correctly', () => {
      render(<CardTemplate />);
      
      expect(screen.getByText('This is a basic card with default styling')).toBeInTheDocument();
      expect(screen.getByText('A smaller card with compact padding')).toBeInTheDocument();
      expect(screen.getByText('Click me to see the interaction')).toBeInTheDocument();
    });

    it('handles card click interactions', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      render(<CardTemplate />);
      
      fireEvent.click(screen.getByText('Interactive Card'));
      expect(alertSpy).toHaveBeenCalledWith('Card clicked!');
      
      alertSpy.mockRestore();
    });
  });

  describe('InputTemplate', () => {
    it('renders all input variants', () => {
      render(<InputTemplate />);
      
      expect(screen.getByText('Input Component')).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
      render(<InputTemplate />);
      
      const nameInput = screen.getByLabelText('Full Name');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      expect(nameInput).toHaveValue('John Doe');
      
      const emailInput = screen.getByLabelText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      expect(emailInput).toHaveValue('john@example.com');
    });

    it('displays form data correctly', () => {
      render(<InputTemplate />);
      
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email Address');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
    });

    it('shows required field indicators', () => {
      render(<InputTemplate />);
      
      const requiredInputs = screen.getAllByText('*');
      expect(requiredInputs.length).toBeGreaterThan(0);
    });

    it('displays error states correctly', () => {
      render(<InputTemplate />);
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('handles disabled inputs', () => {
      render(<InputTemplate />);
      
      const disabledInput = screen.getByLabelText('Disabled Input');
      expect(disabledInput).toBeDisabled();
    });
  });
});

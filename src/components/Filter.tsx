import { Select, Switch } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const FilterComponent = () => {
    const [category, setCategory] = useState<string | null>(null);
    const [service, setService] = useState<string | null>(null);
    const [seller, setSeller] = useState<string | null>(null);
    const [budget, setBudget] = useState<string | null>(null);
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
    const [proServices, setProServices] = useState(false);
    const [localSellers, setLocalSellers] = useState(false);
    const [onlineSellers, setOnlineSellers] = useState(false);

    const renderSelect = (
        value: string | null,
        onChange: (value: string) => void,
        placeholder: string,
        options: { value: string; label: string }[]
    ) => (
        <Select
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='dropdown-toggle-select'
            style={{ width: 200 }}>
            <Option value='' disabled>
                {placeholder}
            </Option>
            {options.map(option => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );

    return (
        <div id='my-filter'>
            <div className='dropdown-filters'>
                {renderSelect(category, setCategory, 'Category', [
                    { value: 'category1', label: 'Category 1' },
                    { value: 'category2', label: 'Category 2' },
                ])}
                {renderSelect(service, setService, 'Service', [
                    { value: 'service1', label: 'Service 1' },
                    { value: 'service2', label: 'Service 2' },
                ])}
                {renderSelect(seller, setSeller, 'Seller', [
                    { value: 'seller1', label: 'Seller 1' },
                    { value: 'seller2', label: 'Seller 2' },
                ])}
                {renderSelect(budget, setBudget, 'Budget', [
                    { value: 'budget1', label: 'Budget 1' },
                    { value: 'budget2', label: 'Budget 2' },
                ])}
                {renderSelect(deliveryTime, setDeliveryTime, 'Delivery Time', [
                    { value: 'time1', label: 'Time 1' },
                    { value: 'time2', label: 'Time 2' },
                ])}
            </div>

            <div className='toggle-buttons'>
                <div className='toggle-button'>
                    <label>Pro Services</label>
                    <Switch
                        checked={proServices}
                        onChange={checked => setProServices(checked)}
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <div className='toggle-button'>
                    <label>Local Sellers</label>
                    <Switch
                        checked={localSellers}
                        onChange={checked => setLocalSellers(checked)}
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <div className='toggle-button'>
                    <label>Online Sellers</label>
                    <Switch
                        checked={onlineSellers}
                        onChange={checked => setOnlineSellers(checked)}
                        style={{ marginLeft: '10px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;

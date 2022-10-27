export default function Footer() {
    return (
        <div className="bg-[#222] p-5">
            <div className="text-2xl md:text-3xl">OneSoftNet</div>
            <p>Copyright &copy; OneSoftNet, Inc. 2020-{new Date().getFullYear()}</p>
        </div>
    );
}